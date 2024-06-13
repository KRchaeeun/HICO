package ssafy.hico.global.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import ssafy.hico.domain.member.entity.Role;
import ssafy.hico.global.response.error.ErrorCode;
import ssafy.hico.global.response.error.exception.CustomException;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final String BEARER_TYPE = "Bearer";
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;            // 30분
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;  // 7일
    private final Key key;

    public JwtTokenProvider(@Value("${jwt.secret-key}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public TokenResponse createToken(Long memberId, Role role) {
        long now = (new Date()).getTime();
        Date accessTokenExpiredAt = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        Date refreshTokenExpiredAt = new Date(now + REFRESH_TOKEN_EXPIRE_TIME);

        Claims claims = Jwts.claims();
        claims.put("role", role);

        String id = memberId.toString();
        // Access Token 생성
        String accessToken = Jwts.builder()
                .setSubject(id) // 여기서 id를 subject로 설정
                .claim("role", role) // 추가 정보는 claim 메서드를 사용하여 설정
                .setExpiration(accessTokenExpiredAt)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        // Refresh Token 생성
        String refreshToken = Jwts.builder()
                .setSubject(id)
                .setExpiration(refreshTokenExpiredAt)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        return TokenResponse.of(accessToken, refreshToken, BEARER_TYPE);
    }

    public AuthInfo getAuthInfo(String accessToken) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(accessToken)
                .getBody();

        String id = claims.getSubject();
        Role role = Role.valueOf(claims.get("role", String.class));

        // AuthInfo 객체 생성 및 반환
        AuthInfo authInfo = new AuthInfo(Long.parseLong(id), role);
        return authInfo;
    }

    //토큰 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            throw new CustomException(ErrorCode.INVALID_AUTH_TOKEN);
        } catch (ExpiredJwtException e) {
            throw new CustomException(ErrorCode.EXPIRED_AUTH_TOKEN);
        } catch (UnsupportedJwtException e) {
            throw new CustomException(ErrorCode.INVALID_AUTH_TOKEN);
        } catch (IllegalArgumentException e) {
            throw new CustomException(ErrorCode.INVALID_AUTH_TOKEN);
        }
    }

    // AccessToken 파싱하여 JWT Claims 추출
    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(accessToken)
                    .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    public Long getMemberIdFromToken(String token) {
        Claims claims = parseClaims(token);
        return Long.parseLong(claims.getSubject());
    }


    public String getToken(String bearerToken) {
        String token = null;
        if (bearerToken.startsWith("Bearer"))
            token = bearerToken.substring(7);
        return token;
    }
}
