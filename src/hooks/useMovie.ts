import { getUserByToken } from "@actions/userActions";
import { useQuery } from "@tanstack/react-query";

const useMovie = () => {
  return useQuery({
    queryKey: ["movie"],
    queryFn: async () => {
      const user = await getUserByToken();
      console.log({ user });
      if (!user) throw new Error("Usuário não autenticado");
      return user;
    },
    retry: false,
  });
};

export { useMovie };
