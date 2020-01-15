package fr.ujm.turgal;

import java.util.List;

import javax.inject.Inject;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import fr.ujm.turgal.user.Users;
import fr.ujm.turgal.user.UserRepository;
import fr.ujm.turgal.user.UserService;

/**
 * UserController
 */

/* @CrossOrigin(origins = "http://localhost:4200") */
@RestController
@RequestMapping("/user")
public class UserController {

    PasswordEncoder encoder = new BCryptPasswordEncoder();
    
    @Inject
    UserService userService;

    @Inject
    public UserRepository userRep;

    @GetMapping("/users")
    public List<Users> getUsers(){
        return (List<Users>) userRep.findAll();
    }

    /* Exemple tuto pour  */
    /*
    @PostMapping("/users")
    void addUser(@RequestBody Users user) {
        userRep.save(user);
    }
    */

    /* peut-être en sursis si inutile */
    @RequestMapping("/logout")
    public String logout() {
        return "logout";
    }

    @RequestMapping("/connection")
    public String connexion(Authentication auth) {
        /* on vérifie que l'utilisateur soit connecté */
        if (auth != null) {
            /* si c'est le cas, il est redirigé vers l'espace membre */
            if (auth.getAuthorities().toString().equals("[USER]")
                    || auth.getAuthorities().toString().equals("[ADMIN]")) {
                return "membre";
            }
        }
        return "connexion";
    }

    @RequestMapping("/promoteuser") /*************************/
    public String promoteuser(Users u) {
        userService.makeUserAdmin(u.getUserName());
        return "redirect:/member";
    }

    /* fonction pour tester le rôle de l'utilisateur */
    @ResponseBody
    @RequestMapping("/test")
    public String quiEstTu(Authentication auth) {
        if (auth == null)
            return "Not Logged In";
        return "You are " + auth.getName() + " with " + auth.getAuthorities();
    }

    @RequestMapping("/registration")
    public String inscription(Model m) {
        m.addAttribute("reg", new Users());
        return "inscription";
    }

    @RequestMapping("/addutilisateur")
    public String addutilisateur(Users u){
        u.setPassword(encoder.encode(u.getPassword()));
        userRep.save(u);
        return "redirect:/member";
    }

}