import { useState } from 'react';

export default function usePasswordPolicySchemeHooks() {
  const numberRegex: RegExp = new RegExp(/(?=.*?[0-9])/);
  const lowerCharRegex: RegExp = new RegExp(/(?=.*[a-z])/);
  const upperCharRegex: RegExp = new RegExp(/(?=.*[A-Z])/);
  const specialCharacterRegex: RegExp = new RegExp(/(?=.*?[#?!@$%^&*-])/);

  const [isNumbers, setIsNumbers] = useState<boolean>(false);
  const [isLowers, setIsLowers] = useState<boolean>(false);
  const [isUppers, setIsUppers] = useState<boolean>(false);
  const [isSpecials, setIsSpecials] = useState<boolean>(false);
  const [isConfirmPass, setIsConfirmPass] = useState<boolean>(false);
  const [isUsername, setIsUsername] = useState<boolean>(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false);
  const [isNewPassMatch, setIsNewPassMatch] = useState<any>();
  const [isConfirmPassMatch, setIsConfirmPassMatch] = useState<any>();

  const [isPasswordValue, setIsPasswordValue] = useState<string>('');

  const handleUsername = (e: any) => {
    e.target.value.length == 0
      ? setIsUsername(false)
      : setIsUsername(true);
  };

  const handleNewPassword = (e: any) => {
    if (e?.target) {
      setIsPasswordValue(e.target.value);
      numberRegex.test(e.target.value) ? setIsNumbers(true) : setIsNumbers(false);
      lowerCharRegex.test(e.target.value)
        ? setIsLowers(true)
        : setIsLowers(false);
      upperCharRegex.test(e.target.value)
        ? setIsUppers(true)
        : setIsUppers(false);
      specialCharacterRegex.test(e.target.value)
        ? setIsSpecials(true)
        : setIsSpecials(false);
      if (e.target.value !== '') {
        isConfirmPassMatch == e.target.value ? setIsPasswordMatch(true) : setIsPasswordMatch(false);
      } else {
        setIsPasswordMatch(false);
      }
      setIsNewPassMatch(e.target.value);
    }
    else {
      setIsNumbers(false);
      setIsLowers(false);
      setIsUppers(false);
      setIsSpecials(false);
      setIsPasswordMatch(false);
      setIsNewPassMatch('');
      setIsPasswordValue('');
    }

  };

  const handleConfirmPassword = (e: any) => {
    e.target.value.length == 0
      ? setIsConfirmPass(false)
      : setIsConfirmPass(true);

    setIsConfirmPassMatch(e.target.value);
    if (e.target.value !== '') {
      isNewPassMatch == e.target.value ? setIsPasswordMatch(true) : setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(false);
    }
  };

  const isEnabledOnChangePassword =
    isUsername &&
    isNumbers &&
    isUppers &&
    isLowers &&
    isSpecials &&
    isConfirmPass &&
    isPasswordMatch;

  const isEnabledOnResetPassword =
    isNumbers &&
    isUppers &&
    isLowers &&
    isSpecials &&
    isConfirmPass &&
    isPasswordMatch;

  const isEnabledPassword =
    isNumbers &&
    isUppers &&
    isLowers &&
    isSpecials;

  return {
    handleUsername,
    handleNewPassword,
    handleConfirmPassword,
    isNumbers,
    isLowers,
    isUppers,
    isSpecials,
    isConfirmPass,
    isUsername,
    isEnabledOnChangePassword,
    isEnabledOnResetPassword,
    isPasswordMatch,
    isPasswordValue,
    isEnabledPassword
  };
}
