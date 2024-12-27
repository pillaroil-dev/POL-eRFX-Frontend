
import { Button } from "./button";
import GoogleIcon from "./icon/google";


export default function GoogleAuth() {
      
  return (
        <Button className="w-2/3 bg-slate-200 gap-2" variant="outline">
              <GoogleIcon width={18} />
              <p>Google</p>
        </Button>
  )
}
