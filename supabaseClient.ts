import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tzxgjezmwlvnzquvhnhv.supabase.co/rest/v1/'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6eGdqZXptd2x2bnpxdXZobmh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxODE3ODYsImV4cCI6MjEwMDc1Nzc4Nn0.o7BOmyR9Z0sYdZsQZxxI5mbTewvAKoHYjVUdtdw6z7I'

export const supabase = createClient(supabaseUrl, supabaseKey)