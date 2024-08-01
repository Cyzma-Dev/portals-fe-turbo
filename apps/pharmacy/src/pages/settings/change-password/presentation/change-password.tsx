import { useForm } from "react-hook-form";
import usePasswordPolicySchemeHooks from "../../../../../../../packages/common/src/common-hooks/usePasswordPolicySchemeHooks";
import PasswordPolicyTicks from "../../../../../../../packages/ui/src/components/passwordPolicyTicks";
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Icons, Input, Separator } from "@repo/ui/shadcn";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "./schema";
import { z } from "zod";
import { useState } from "react";

interface IChangePasswordProps {
  onSubmit: (dataItem: any) => Promise<string | undefined>;
  isTokenExpired: boolean;
  errorMessage: string;
  isLoading: any;
}

export const ChangePasswordScreen = (props: IChangePasswordProps) => {
  const [showPolicy, setShowPolicy] = useState(false);
  const [isPassword, setIsPassword] = useState('');

  const {
    handleNewPassword,
    handleConfirmPassword,
    isNumbers,
    isLowers,
    isEnabledOnResetPassword,
    isSpecials,
    isUppers,
    isPasswordMatch,
    isPasswordValue,
  } = usePasswordPolicySchemeHooks();

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      password: "",
      confirm_password: "",
    },
  });

  const onChangePasswordSubmit = async (data: any) => {
    const resetRequest = {
      ...data,
    };
    const result = await props.onSubmit(resetRequest);
    if (result === "success") {
		form.reset({
			current_password: "",
			password: "",
			confirm_password: "",
		});
	  	setShowPolicy(false)
		setIsPassword('')
    }
  };

  return (
    <div className="p-4 rounded-md border border-muted-foreground/10 flex-1">
      <div>
        Change Password
        <div className="text-sm font-normal">
          Update your password by filling the below details.
        </div>
      </div>
      <Separator className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onChangePasswordSubmit)}>
          <div className="flex flex-col gap-4 pb-4">
            <FormField
              control={form.control}
              name="current_password"
              disabled={props.isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Current Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              disabled={props.isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Password"
                      onChange={(e) => {
                        field.onChange(e);
                        handleNewPassword(e);
                        setIsPassword(e.target.value);
                      }}
                      onFocus={() => setShowPolicy(true)}
                      onBlur={() => setShowPolicy(true)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              disabled={props.isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(e) => {
                        field.onChange(e);
                        handleConfirmPassword(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {isPassword && showPolicy && (
            <PasswordPolicyTicks
              isNumbers={isNumbers}
              isUppers={isUppers}
              isLowers={isLowers}
              isSpecials={isSpecials}
              isPasswordMatch={isPasswordMatch}
              isPasswordValue={isPasswordValue}
            />
          )}
          <Button
            className="w-full"
            type="submit"
            disabled={!isEnabledOnResetPassword || props.isLoading}
          >
            {props.isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Change Password"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
