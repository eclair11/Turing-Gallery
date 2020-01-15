package fr.ujm.turgal.user;

import org.springframework.security.core.GrantedAuthority;

/**
 * UserRole
 */
public enum UserRole implements GrantedAuthority {
    
    USER,
    MODERATEUR,
    ADMIN;

    @Override
    public String getAuthority() {
        return "ROLE_"+this.name();
    }

    
}