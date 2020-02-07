package fr.ujm.turgal.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import fr.ujm.turgal.model.User;
import fr.ujm.turgal.model.UserRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository UserRepo;

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Optional<User> user = UserRepo.findByUsername(username);

		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.get().getUsername(),
				user.get().getPassword(), new ArrayList<>());
	}

	/*
	 * @Override public UserDetails loadUserByUsername(String username) throws
	 * UsernameNotFoundException { if ("javainuse".equals(username)) { return new
	 * User("javainuse",
	 * "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6", new
	 * ArrayList<>()); } else { throw new
	 * UsernameNotFoundException("User not found with username: " + username); } }
	 */

}