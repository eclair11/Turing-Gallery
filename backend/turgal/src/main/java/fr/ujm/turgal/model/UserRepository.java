package fr.ujm.turgal.model;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * UserRepository
 */
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    List<User> findAllByOrderByUsername();

    User findIdByUsername(String username);

    Boolean existsByUsername(String username);

    Optional<User> findById(Long id);

}