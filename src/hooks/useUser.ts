import { getUserByToken } from "@actions/user/userActions";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getUserByToken();
      if (!user) throw new Error("Usuário não autenticado");
      return user;
    },
    retry: false,
  });
};

export { useUser };
