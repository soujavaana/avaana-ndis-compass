
-- Add any missing fields to the profiles table for business information
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS business_description TEXT,
ADD COLUMN IF NOT EXISTS industry TEXT;

-- Ensure we have all necessary fields in key_personnel table
ALTER TABLE public.key_personnel 
ADD COLUMN IF NOT EXISTS ownership_percentage DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS start_date DATE;

-- Add RLS policies for key_personnel if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'key_personnel' 
        AND policyname = 'Users can view their own key personnel'
    ) THEN
        CREATE POLICY "Users can view their own key personnel" 
        ON public.key_personnel 
        FOR SELECT 
        USING (profile_id = auth.uid());
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'key_personnel' 
        AND policyname = 'Users can insert their own key personnel'
    ) THEN
        CREATE POLICY "Users can insert their own key personnel" 
        ON public.key_personnel 
        FOR INSERT 
        WITH CHECK (profile_id = auth.uid());
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'key_personnel' 
        AND policyname = 'Users can update their own key personnel'
    ) THEN
        CREATE POLICY "Users can update their own key personnel" 
        ON public.key_personnel 
        FOR UPDATE 
        USING (profile_id = auth.uid());
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'key_personnel' 
        AND policyname = 'Users can delete their own key personnel'
    ) THEN
        CREATE POLICY "Users can delete their own key personnel" 
        ON public.key_personnel 
        FOR DELETE 
        USING (profile_id = auth.uid());
    END IF;
END $$;

-- Add RLS policies for shareholders if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'shareholders' 
        AND policyname = 'Users can view their own shareholders'
    ) THEN
        CREATE POLICY "Users can view their own shareholders" 
        ON public.shareholders 
        FOR SELECT 
        USING (profile_id = auth.uid());
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'shareholders' 
        AND policyname = 'Users can insert their own shareholders'
    ) THEN
        CREATE POLICY "Users can insert their own shareholders" 
        ON public.shareholders 
        FOR INSERT 
        WITH CHECK (profile_id = auth.uid());
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'shareholders' 
        AND policyname = 'Users can update their own shareholders'
    ) THEN
        CREATE POLICY "Users can update their own shareholders" 
        ON public.shareholders 
        FOR UPDATE 
        USING (profile_id = auth.uid());
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'shareholders' 
        AND policyname = 'Users can delete their own shareholders'
    ) THEN
        CREATE POLICY "Users can delete their own shareholders" 
        ON public.shareholders 
        FOR DELETE 
        USING (profile_id = auth.uid());
    END IF;
END $$;

-- Enable RLS on tables if not already enabled
ALTER TABLE public.key_personnel ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shareholders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Add RLS policy for profiles if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'Users can view their own profile'
    ) THEN
        CREATE POLICY "Users can view their own profile" 
        ON public.profiles 
        FOR SELECT 
        USING (id = auth.uid());
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'Users can update their own profile'
    ) THEN
        CREATE POLICY "Users can update their own profile" 
        ON public.profiles 
        FOR UPDATE 
        USING (id = auth.uid());
    END IF;
END $$;
