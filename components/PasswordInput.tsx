import { ComponentProps, useState } from "react";
import { Input } from "./ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type IProps = ComponentProps<typeof Input> & {
  field?: any;
};
function PasswordInput({ field, ...props }: IProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        placeholder="أدخل كلمة المرور"
        type={showPassword ? "text" : "password"}
        {...props}
        {...field}
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="text-muted-foreground hover:text-foreground absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer p-0"
      >
        {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
      </span>
    </div>
  );
}
export default PasswordInput;
