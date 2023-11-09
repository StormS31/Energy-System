package com.sd.usermicroserviceassig1.utils.exceptions;

import com.sd.usermicroserviceassig1.utils.enums.UserRole;
import jakarta.servlet.http.Cookie;

public class LoginUtilService {

    public static UserRole getRole(String role){
        switch (role){
            case "ADMIN": return UserRole.ADMIN;
            case "CLIENT": return UserRole.CLIENT;
        }
        return UserRole.CLIENT;
    }

    public static Cookie createJwtCookie(String jwt) {
        Cookie cookie = new Cookie("auth-cookie", jwt);
        cookie.setPath("/");
        cookie.setDomain("localhost");
        cookie.setHttpOnly(false);
        return cookie;
    }
}
