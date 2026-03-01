// This tells TypeScript that any import ending in .css is valid
declare module "*.css";

// This specifically handles the Swiper modules that are causing the build to fail
declare module 'swiper/css';
declare module 'swiper/css/bundle';
declare module 'swiper/css/pagination';
declare module 'swiper/css/navigation';