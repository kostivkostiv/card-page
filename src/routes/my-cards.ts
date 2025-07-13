import MyCards from '@/pages/MyCards';
import { createFileRoute } from '@tanstack/react-router';


export const Route = createFileRoute('/my-cards')({
  component: MyCards,
})
