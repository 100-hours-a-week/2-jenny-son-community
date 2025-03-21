// IIFE(즉시 실행 함수) 패턴을 사용하면 전역 스코프 오염을 줄인다.
(function() {
    /* -----------------------------
    * 0. 프로필 드롭다운 기능
    * ----------------------------- */
    const profileBtn = document.querySelector(".header-profile");
    const dropdown = document.querySelector(".header-dropdown");

    if (!profileBtn || !dropdown) {
        // header 요소들이 아직 DOM에 없으면 종료 (예: fetch로 header.html을 삽입 후 실행해야 함)
        return;
    }    

    // 프로필사진 클릭 시 열기
    profileBtn.addEventListener("click", (event) => {
        console.log("프로필버튼클릭");
        event.stopPropagation(); // 클릭 이벤트가 부모 요소로 전파되는 것을 방지
        dropdown.classList.toggle("active");     
        console.log("현재 드롭다운 클래스 목록:", dropdown.classList);
        console.log("드롭다운 opacity:", window.getComputedStyle(dropdown).opacity);
        console.log("드롭다운 visibility:", window.getComputedStyle(dropdown).visibility);
    })

    // 드롭다운 외부 클릭 시 닫기
    document.addEventListener("click", (event) => {
        if (!profileBtn.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove("active");
        }
    })

    /* -----------------------------
    * 1. 드롭다운 내 기능 
    * ----------------------------- */
    /* -----------------------------
    * 1-1. 회원정보수정 페이지 이동
    * ----------------------------- */
    const elEditProfileButton = document.getElementById("edit-profile-btn");
    if (elEditProfileButton) {
        elEditProfileButton.addEventListener("click", () => {
            window.location.href = "../profile/edit-profile.html";
        })
    }

    /* -----------------------------
    * 1-2. 비밀번호수정 페이지 이동
    * ----------------------------- */
    const elEditPasswordButton = document.getElementById("edit-password-btn");
    if (elEditPasswordButton) {
        elEditPasswordButton.addEventListener("click", () => {
            window.location.href = "../profile/edit-password.html";
        })
    }

    /* -----------------------------
    * 1-3. 로그아웃
    * ----------------------------- */
    // 로컬스토리지에서 로그인 정보 삭제 후 로그인 페이지로 이동
    const elLogoutButton = document.getElementById("logout-btn");
    if (elLogoutButton) {
        elLogoutButton.addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            window.location.href = "../login/login.html";
        });
    }


    /* -----------------------------
    * 2. 프로필 사진 설정
    * ----------------------------- */
    // 로그아웃 상태이면 요소를 숨긴다. 
    // 로그인 상태이면 로컬 스토리지의 유저 정보의 이미지를 삽입한다. 이미지가 없다면 회색으로 처리한다. 
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    const elHeaderProfile = document.querySelector(".header-profile");
    const elProfileImage = document.querySelector(".header-profile-image");

    if (elHeaderProfile) {
        if (loggedInUser && Object.keys(loggedInUser).length > 0) {
            // 로그인 상태: header-profile 보이기
            elHeaderProfile.style.display = "flex";
            
            if (loggedInUser.profileImage) {
                // 사용자가 프로필 이미지를 가지고 있다면
                if (elProfileImage) {
                    elProfileImage.src = loggedInUser.profileImage;
                    // 이미지 로딩 실패 시 회색 배경 처리
                    elProfileImage.onerror = function() {
                        elProfileImage.style.display = "none";
                        elHeaderProfile.style.backgroundColor = "#ccc";
                    };
                }
            } else {
                // 프로필 이미지가 없는 경우, 이미지 요소 감추고 회색 배경 적용
                if (elProfileImage) {
                    elProfileImage.style.display = "none";
                }
                elHeaderProfile.style.backgroundColor = "#ccc";
            }
        } else {
            // 로그인 상태가 아니면 header-profile 요소 자체를 숨김
            if (elHeaderProfile) {
                elHeaderProfile.style.display = "none";
            }
        }
    }

    /* -----------------------------
    * 3. 뒤로가기 버튼 설정
    * ----------------------------- */
    // 페이지 마다 뒤로가기 버튼 유무가 다르다. 
    // : 각 페이지의 css코드에서 처리한다. 

})();