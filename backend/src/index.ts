import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { blogController } from "./blog/blog.controller";
import { authController } from "./auth/auth.controller";
import { imgController } from "./img/img.controller";
import { kvController } from "./keyvalue/kv.controller";
import { reposController } from "./repository/repos.controller";
import { contactController } from "./contact/contact.controller";
import { rateLimit } from "elysia-rate-limit";
import cors from "@elysiajs/cors";

const BLOCKED_USER_AGENTS = [
  'GPTBot',              
  'ChatGPT-User',        
  'CCBot',                
  'anthropic-ai',        
  'Claude-Web',          
  'cohere-ai',           
  'AhrefsBot',           
  'SemrushBot',          
  'DotBot',              
  'MJ12bot',             
  'BLEXBot',             
  'PetalBot',            
  'DataForSeoBot',       
  'Bytespider',          
  'ia_archiver',           
  'Yandexbot',           
  'YandexImages',         
];

const app = new Elysia()
  .onBeforeHandle(({ request, set }) => {
    const userAgent = request.headers.get('user-agent') || '';

    const isBlocked = BLOCKED_USER_AGENTS.some(blockedAgent =>
      userAgent.toLowerCase().includes(blockedAgent.toLowerCase())
    );

    if (isBlocked) {
      set.status = 403;
      return {
        error: 'Forbidden',
        message: 'Access denied for this user agent'
      };
    }
  })
  .use(rateLimit({ max: 100, duration: 60000 }))
  .use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  }))
  .use(swagger())
  .get("/health", () => ({ status: "ok", timestamp: new Date().toISOString() }))
  .use(authController)
  .use(blogController)
  .use(imgController)
  .use(kvController)
  .use(reposController)
  .use(contactController)
  .listen(8000);


