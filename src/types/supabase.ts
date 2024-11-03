export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string | null
          email: string
          password: string
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name?: string | null
          email: string
          password: string
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string
          password?: string
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      contents: {
        Row: {
          id: string
          title: string
          content: string
          type: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          type: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          type?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
} 