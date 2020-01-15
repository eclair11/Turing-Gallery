package fr.ujm.turgal;

import fr.ujm.turgal.user.UserService;
import javax.inject.Inject;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;



@Configuration
@EnableWebSecurity
public class WebSecu extends WebSecurityConfigurerAdapter {

        @Inject
        UserService userDetailsService;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
                http.authorizeRequests().antMatchers("/", "/connection", "/registration", "/api", "/api/**").permitAll()
                                .antMatchers("/member").hasRole("USER");
                http.formLogin().loginPage("/connection").usernameParameter("username").passwordParameter("password")
                                .and().logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutSuccessUrl("/home") // NB: CSRF will disallow visiting GET /logout manually
                                .and().csrf().ignoringAntMatchers("/h2-console/**")// don't apply CSRF protection to
                                                                                   
                ;
                http.headers().frameOptions().sameOrigin(); // /h2-console
                
        }

        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
                auth.userDetailsService(userDetailsService).passwordEncoder(userDetailsService.encoder);
        }
        
     
}