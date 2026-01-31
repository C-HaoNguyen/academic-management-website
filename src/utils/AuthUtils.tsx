import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    sub: string;
    role?: string;
    roles?: string[];
    authorities?: string[];
    exp?: number;
}

export function isLoggedIn() {
    const token = getAccessToken();
    if (!token) return false;

    return !isTokenExpired();
}

export function getAccessToken() {
    return localStorage.getItem("accessToken");
}

export function getUsername() {
    const token = getAccessToken();
    if (!token) return null;

    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.sub;
}

export function extractRole(): string | null {
    const token = getAccessToken();
    if (!token) return null;

    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded.role) return decoded.role;

    if (decoded.roles?.length)
        return decoded.roles[0].toUpperCase().replace("ROLE_", "");

    if (decoded.authorities?.length)
        return decoded.authorities[0].toUpperCase().replace("ROLE_", "");

    return null;
}

export function isTokenExpired() {
    const token = getAccessToken();
    if (!token) return true;

    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return false;

    return decoded.exp * 1000 < Date.now();
}

export function logout() {
    localStorage.clear();
    // hard redirect để reset toàn bộ state
    window.location.href = "/login"; 
}
