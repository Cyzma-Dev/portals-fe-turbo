import { Button } from "@repo/ui/shadcn";
import React from "react";
import { useNavigate } from "react-router-dom";

export const AccountCreated = () => {
  const history = useNavigate();

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center space-y-4">
        <img className="w-[12rem] sm:w-[16rem]" src="svg/inbox.svg" alt="page not found"></img>
        <div className="flex flex-col items-center">
            <p className="text-md">
                Email <span className="underline text-primary">confirmation</span>
            </p>
            <p className="text-left sm:text-center text-sm w-[20rem] sm:w-[40rem]">
                We have sent you an email to your given address to confirm
                the validity of your account. After receiving the email
                follow the link provided to <span className="underline text-primary">activate</span> your account.
            </p>
        </div>
        <Button 
            type="button"
            onClick={()=>history("/login")}
            >
            Back to homepage
        </Button>
    </div>
    // <div>
    //   <Box className={styles.pageContainer}>
    //     <div className={styles.successContainer}>
    //       <div className={styles.iconContainer}>
    //         <CheckCircleIcon className={commonStyles.successIcon} />
    //         <Typography variant="body1" color="green">
    //           Success
    //         </Typography>
    //       </div>
    //       <Typography variant="h6" align="center" gutterBottom>
    //         An activation link has been sent to the provided E-mail Address.
    //         <br />
    //         Please click on the link to activate your account to access{" "}
    //         <label style={{ color: "#0295FF", fontWeight: "bold" }}>
    //           Patient Portal.
    //         </label>
    //       </Typography>
    //       <Link to="/" className={styles.link}>
    //         back to login
    //       </Link>
    //     </div>
    //   </Box>
    // </div>
  );
};
