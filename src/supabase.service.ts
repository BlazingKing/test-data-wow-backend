import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!,
    );
  }

  async getUsers(): Promise<any> {
    const { data, error } = await this.supabase.from('users').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  async createUser(username: string) {
    const { data, error } = await this.supabase
      .from('users')
      .insert([{ username }]);
    if (error) throw new Error(error.message);
    return data;
  }

  async getCommunities(): Promise<any> {
    const { data, error } = await this.supabase.from('communities').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  async getPosts(): Promise<any> {
    const { data, error } = await this.supabase
      .from('posts')
      .select('*, users(username), communities(name)');
    if (error) throw new Error(error.message);
    return data;
  }

  async createPost(
    title: string,
    content: string,
    userId: string,
    communityId: string,
  ) {
    const { data, error } = await this.supabase
      .from('posts')
      .insert([{ title, content, user_id: userId, community_id: communityId }]);
    if (error) throw new Error(error.message);
    return data;
  }
}
