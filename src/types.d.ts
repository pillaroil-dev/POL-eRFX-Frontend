import 'astro';

declare module 'astro' {
    interface Locals {
        user?: any; // Replace `any` with a more specific type according to your user object structure
    }
}