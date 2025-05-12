import {ref, computed} from "vue";
import { useRouter } from "vue-router";

export default function userLogin() {
    const router = useRouter();
    const userId = ref("");
    const pw = ref("");

    const login = async() => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/user/sign-in', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              // credentials: 'include',
              body: JSON.stringify({userId: userId.value, pw: pw.value}),
            });
            if(!response.ok) {
              throw new Error('login failed');
            }

            const data = await response.json();
            // JWT 저장(로컬 스토리지)
            localStorage.setItem("token", data.accessToken);
            
            router.push('/');
          } catch(error){
            console.error(error);
            alert('오류가 발생했습니다.\n다시 로그인 해주세요.');
          }
    }

    return {
        userId,
        pw,
        login,
    }
}