package fr.ujm.turgal.api.authentification;

import java.util.List;
import java.util.Optional;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.ujm.turgal.model.User;
import fr.ujm.turgal.model.UserRepository;

/**
 * InscriptionController
 */
@RestController
@RequestMapping("/api/v1/authentification")
@CrossOrigin
public class InscriptionController {

    PasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    public UserRepository userRepo;

    @PostMapping("/inscription")
    public Boolean addUser(@RequestBody User user) throws Exception {

        String username = user.getUsername();
        if (userRepo.existsByUsername(username)) {
            throw new ValidationException("Username already taken");
        }

        String password = user.getPassword();
        String encodedPassword = encoder.encode(password);
        String email = user.getEmail();
        String displayname = user.getUsername();
        userRepo.save(new User(username, encodedPassword, displayname, email));

        return true;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return (List<User>) userRepo.findAll();
    }

    @GetMapping("users/{userId}")
    public Optional<User> getUser(@PathVariable String userId) {
        Long userLongId = Long.parseLong(userId);
        return userRepo.findById(userLongId);
    }

}