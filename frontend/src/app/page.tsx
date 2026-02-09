import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function page(){
  return (
    <div className="p-20 flex gap-3  text-2xl font-semibold">
      
      <Button>Pulse AI</Button>
      <Button variant={'destructive'}>Button</Button>
      <Button variant={'ghost'}>Button</Button>
      <Input placeholder="Ask me anything..." />
    
    </div>

  )
}


export default page;