package fr.ujm.turgal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Random;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.multipart.MultipartFile;

/**
 * PictureRestControllerTests
 */
public class PictureRestControllerTests extends AbstractTest {

    @Override
    @BeforeEach
    public void setUp() {
        super.setUp();
    }

    @Test
    public void getPictures() throws Exception {
        String uri = "/api/v1/pictures/1";
        MvcResult result = mvc.perform(MockMvcRequestBuilders.get(uri).accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();
        int status = result.getResponse().getStatus();
        String content = result.getResponse().getContentAsString();
        assertEquals(200, status);
        assertTrue(content.length() > 0);
    }

    @Test
    public void importPictures() throws Exception {
        String uri = "/api/v1/pictures";
        Random rand = new Random();
        String[] widths = {};
        String[] heights = {};
        String[] sizes = {};
        MultipartFile[] pictures = {};
        for (int i = 0; i < 10; i++) {
            widths[i] = String.valueOf(rand.nextInt(5000));
            heights[i] = String.valueOf(rand.nextInt(5000));
            sizes[i] = String.valueOf(rand.nextInt(100000));
            pictures[i] = new MockMultipartFile(String.valueOf(i), String.valueOf(i).getBytes());
        }
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri).param("widths", widths)
                .param("heights", heights).param("sizes", sizes)).andReturn();
        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
    }

    @Test
    public void deletePictures() throws Exception {
        String uri = "/api/v1/pictures";
        Random rand = new Random();
        String[] pictures = {};
        for (int i = 0; i < 10; i++) {
            pictures[i] = String.valueOf(rand.nextInt(500));
        }
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.put(uri).param("pictures", pictures)).andReturn();
        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
    }

}