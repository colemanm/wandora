-- Check if the user creation trigger exists
SELECT 
    trigger_name,
    event_manipulation,
    trigger_schema,
    trigger_table,
    action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- Check if the function exists
SELECT 
    routine_name,
    routine_type,
    data_type
FROM information_schema.routines 
WHERE routine_name = 'handle_new_user';

-- Check current users in both tables
SELECT 'Auth users:' as table_name, count(*) as count FROM auth.users
UNION ALL
SELECT 'Profile users:' as table_name, count(*) as count FROM public.users;

-- Show mismatched users (in auth but not in profiles)
SELECT 
    'Missing profiles:' as issue,
    au.id,
    au.email,
    au.created_at
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL;