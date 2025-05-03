import {ref, computed} from "vue";

export default function userSignUp() {
    const userId = ref("");
    const pw = ref("");
    const pwCheck = ref("");
    const role = ref("general");

    const isValidUserId = computed(() => {
        const hasNumber = /\d/.test(userId.value);
        const isValidFormat = /^[A-Za-z0-9]+$/.test(userId.value);
        return userId.value.length >= 4 && userId.value.length <= 12 && hasNumber && isValidFormat;
    })

    const userIdMessage = computed(() => {
        if(userId.value.length == 0){
            return "4~12글자의 영문 소문자와 숫자를 모두 포함한 아이디를 입력해주세요";
        }
        return isValidUserId.value ? "사용 가능한 아이디입니다" : "아이디는 4~12자의 영문과 숫자로 입력해주세요"; 
    })

    const isValidPassword = computed(() => {
        const hasNumber = /\d/.test(pw.value);
        const hasSpecial = /[@$!%*#?&]/.test(pw.value);
        const isValidFormat = /^[A-Za-z0-9@$!%*#?&]+$/.test(pw.value);
        return pw.value.length >= 8 && pw.value.length <= 20 && hasNumber && hasSpecial && isValidFormat;
    })

    const userPwMessage = computed(() => {
        if(pw.value.length == 0){
            return "8~20글자의 영문, 숫자, 특수문자를 모두 포함한 비밀번호를 입력해주세요";
        }
        return isValidPassword.value ? "사용 가능한 비밀번호입니다" : "비밀번호를 올바르게 설정해주세요";
    })

    const pwCheckCorrect = computed(() => {
        return pw.value == pwCheck.value;
    })

    const pwCheckMessage = computed(() => {
        return pwCheckCorrect.value ? "" : "비밀번호를 동일하게 입력해주세요." 
    })

    const signUp = async () => {
        if(!isValidUserId.value) {
            alert("아이디를 올바르게 입력해주세요.");
            return;
        }
        if(!isValidPassword.value) {
            alert("비밀번호를 올바르게 입력해주세요.");
            return;
        }
        if(!pwCheckCorrect.value) {
            alert("비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        const apiUrl = role.value == "general"
        ? "http://localhost:8080/api/v1/general/sign-up" : "http://localhost:8080/api/v1/expert/sign-up"; 

        try {
            const response = await fetch(apiUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: userId.value,  // ✅ this.userId → userId.value
                pw: pw.value,  // ✅ this.pw → pw.value
                role: role.value,  // ✅ this.selectRole → role.value
              }),
            });
      
            if (!response.ok) {
                throw new Error("회원가입 실패하였습니다.\n아이디와 비밀번호를 다시 확인해주세요.");
            }
      
            alert("회원가입이 완료되었습니다!");
        }
        catch (error) {
            console.error(error);
            alert("회원가입 중 오류가 발생했습니다.");
        }
    };

    const checkDuplicateId = async () => {
        // TODO
        // 중복 체크 로직 추가
        alert("사용 가능한 아이디입니다.");
    };

    return {
        userId,
        pw,
        pwCheck,
        role,
        isValidUserId,
        userIdMessage,
        isValidPassword,
        userPwMessage,
        pwCheckCorrect,
        pwCheckMessage,
        signUp,
        checkDuplicateId,
    };
}