import { UsersService } from "@common/webapi";

export async function isFieldRequired(val: string) {
  if (!!val) return true;
  return "Field is required";
}

export async function isUsernameValid(val: string) {
  try {
    if (val.match(/[!@#$%^?&*)(\s]/g))
      throw new Error(
        "Username can not include empty space or special characters"
      );

    // Check if val as a username has been taken or not
    await UsersService.getUsersAvailable(val).catch(() => {
      throw new Error("Username taken! Try another username");
    });
    return true;
  } catch (err: any) {
    return err.message;
  }
}

export async function isPasswordValid(val: string) {
  if (val.length <= 8) {
    return "Password must be at least 8 characters";
  }

  return true;
}

export async function isEmailValid(val: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
    return true;
  }

  return "Invalid email address";
}
