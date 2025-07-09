const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testGemstoneCreation() {
  console.log('Testing gemstone creation...')
  
  try {
    // First, check if the table exists
    console.log('1. Checking if gemstones table exists...')
    const { data: tableCheck, error: tableError } = await supabase
      .from('gemstones')
      .select('count')
      .limit(1)
    
    if (tableError) {
      console.error('❌ Gemstones table error:', tableError)
      return
    }
    
    console.log('✅ Gemstones table exists')
    
    // Test creating a gemstone
    console.log('2. Testing gemstone creation...')
    const testGemstone = {
      user_id: '123e4567-e89b-12d3-a456-426614174000', // Test UUID
      title: 'Test Gemstone',
      description: 'This is a test gemstone',
      location_name: 'Test Location',
      latitude: 40.7128,
      longitude: -74.0060,
      user_rating: 5
    }
    
    const { data: gemstone, error: gemstoneError } = await supabase
      .from('gemstones')
      .insert(testGemstone)
      .select()
      .single()
    
    if (gemstoneError) {
      console.error('❌ Gemstone creation error:', gemstoneError)
      return
    }
    
    console.log('✅ Gemstone created successfully:', gemstone)
    
    // Clean up - delete the test gemstone
    console.log('3. Cleaning up test gemstone...')
    const { error: deleteError } = await supabase
      .from('gemstones')
      .delete()
      .eq('id', gemstone.id)
    
    if (deleteError) {
      console.error('❌ Error deleting test gemstone:', deleteError)
    } else {
      console.log('✅ Test gemstone deleted successfully')
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

testGemstoneCreation()