package fr.ujm.turgal.user;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.security.core.userdetails.User;


/**
 * UserService
 */
@Component
public class UserService implements UserDetailsService {


    @Inject
    UserRepository repo;

    public final PasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> opt = repo.findByUserName(username);
        if (!opt.isPresent()) {
            throw new UsernameNotFoundException(username);
        }
        Users u = opt.get();
        u.getRoles().add(UserRole.USER);
        return new User(u.getUserName(), u.getPassword(), u.getRoles());
    }

    public void saveUserComputingDerivedPassword(Users u, String rawPassword) {
        setComputingDerivedPassword(u, rawPassword);
        repo.save(u);
    }

    public void setComputingDerivedPassword(Users u, String rawPassword) {
        String codedPassword = encoder.encode(rawPassword);
        u.setPassword(codedPassword);
    }

    public void makeUserAdmin(String username) {
        Users u = repo.findById(username).orElse(null);
        u.getRoles().add(UserRole.ADMIN);
        repo.save(u);
    }

    public List<Users> listAllUsers() {
        return repo.findAllByOrderByUserName();
    }
   
    
}