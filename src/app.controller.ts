import { Body, Controller, Get, Post } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Controller()
export class AppController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get('users')
  getUsers() {
    return this.supabaseService.getUsers();
  }

  @Post('users')
  createUser(@Body() body: { username: string }) {
    return this.supabaseService.createUser(body.username);
  }

  @Get('communities')
  getCommunities() {
    return this.supabaseService.getCommunities();
  }

  @Get('posts')
  getPosts() {
    return this.supabaseService.getPosts();
  }

  @Post('posts')
  createPost(
    @Body()
    body: {
      title: string;
      content: string;
      userId: string;
      communityId: string;
    },
  ) {
    return this.supabaseService.createPost(
      body.title,
      body.content,
      body.userId,
      body.communityId,
    );
  }
}
