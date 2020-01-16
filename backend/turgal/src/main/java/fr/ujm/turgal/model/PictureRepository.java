package fr.ujm.turgal.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * PictureRepository
 */
@Repository
public interface PictureRepository extends JpaRepository<Picture, Long> {

    
}