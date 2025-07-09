'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { User } from '@/types'

interface AuthContextType {
  user: SupabaseUser | null
  profile: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create a single instance outside the component
const supabase = createClient()

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        // If profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          console.log('User profile not found, creating...')
          await createUserProfile(userId)
          return
        }
        throw error
      }
      
      // If no created_at, use current date as fallback
      if (!data.created_at) {
        data.created_at = new Date().toISOString()
      }
      
      setProfile(data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  const createUserProfile = async (userId: string) => {
    try {
      // Get user info from auth
      const { data: authUser, error: authError } = await supabase.auth.getUser()
      if (authError) throw authError

      const user = authUser.user
      if (!user) throw new Error('No authenticated user found')

      // Create profile
      const { data, error } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: user.email || '',
          name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      console.log('User profile created successfully')
      setProfile(data)
    } catch (error) {
      console.error('Error creating user profile:', error)
    }
  }

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          setUser(null)
          setProfile(null)
          setLoading(false)
          return
        }

        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchUserProfile(session.user.id)
        }
      } catch (error) {
        console.error('Session error:', error)
        setUser(null)
        setProfile(null)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Only log significant events in development
        if (process.env.NODE_ENV === 'development' && event !== 'TOKEN_REFRESHED') {
          console.log('Auth state changed:', event, session?.user?.id)
        }
        
        if (event === 'SIGNED_OUT') {
          setUser(null)
          setProfile(null)
          setLoading(false)
          return
        }
        
        // Only update user if it's actually different
        const newUser = session?.user ?? null
        setUser(currentUser => {
          if (currentUser?.id === newUser?.id) {
            return currentUser // No change
          }
          return newUser
        })
        
        // Only fetch profile if user changed or we don't have one
        if (session?.user) {
          setProfile(currentProfile => {
            if (currentProfile?.id === session.user.id) {
              return currentProfile // Profile already exists for this user
            }
            // Fetch profile for new user
            fetchUserProfile(session.user.id)
            return currentProfile
          })
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        }
      }
    })

    if (error) return { error }

    // User profile will be created automatically by database trigger
    // No need to manually create it here

    return { error: null }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Sign out error:', error)
    }
    // Force clear the state even if there's an error
    setUser(null)
    setProfile(null)
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return { error: new Error('No user logged in') }

    const { error } = await supabase
      .from('users')
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (!error) {
      await fetchUserProfile(user.id)
    }

    return { error }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}