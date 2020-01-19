package fr.ujm.turgal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.ujm.turgal.user.Users;

/**
 * userRepository
 */
@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

	Optional<Users> findByUserName(String userName);

	List<Users> findAllByOrderByUserName();

	//Optional<Users> findById(String username);

	Users findIdByUserName(String username);

	Boolean existsByUserName(String username);
	
	Optional<Users> findById(Long id);

}