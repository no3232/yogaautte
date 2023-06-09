import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userInfoAtom, userIsLogin } from "../recoil/userAtom";
import { loginAPI } from "../api/authApiFunctions";
import { TAxoisUserInfo } from "../api/authApiFunctions";
import { TinitialValues } from "./useForm";


export const useLogin = () => {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  // const [cookies, setCookies, removeCooke] = useCookies(["accessToken"]);
  const navigation = useNavigate();

  const [isLogin, setIsLogin] = useRecoilState(userIsLogin)

  return useMutation(
    (values: TinitialValues) => {
      return loginAPI(values);
    },
    {
      onSuccess: async (data: TAxoisUserInfo) => {
        setIsLogin(data.accessToken)
        console.log(isLogin)
        setUserInfo({
          userIdx: data.userIdx,
          userNickname: data.userNickname,
          userAddress: data.userAddress,
          userName: data.userName,
          userDistance: data.userDistance,
        });
        navigation("/mobile/mypage");
      },
    }
  );
};
