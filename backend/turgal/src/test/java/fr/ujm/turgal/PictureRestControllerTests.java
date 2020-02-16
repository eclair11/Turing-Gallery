package fr.ujm.turgal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.File;
import java.nio.file.Files;
import java.util.Iterator;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.FileImageInputStream;
import javax.imageio.stream.ImageInputStream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import fr.ujm.turgal.model.User;

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
    public void postPictures() throws Exception {
        String uri = "/api/v1/pictures";
        int number = 10;
        String[] username = { new User("usertest", "usertest").getUsername() };
        String[] widths = new String[number];
        String[] heights = new String[number];
        String[] sizes = new String[number];
        byte[][] pictures = new byte[number][];
        File folder = new File("./src/test/resources/img/");
        File[] listOfFiles = folder.listFiles();
        int i = 0;
        for (File file : listOfFiles) {
            if (file.isFile()) {
                int pos = file.getName().lastIndexOf(".");
                String suffix = file.getName().substring(pos + 1);
                Iterator<ImageReader> iter = ImageIO.getImageReadersBySuffix(suffix);
                while (iter.hasNext()) {
                    ImageReader reader = iter.next();
                    ImageInputStream stream = new FileImageInputStream(file);
                    reader.setInput(stream);
                    widths[i] = String.valueOf(reader.getWidth(reader.getMinIndex()));
                    heights[i] = String.valueOf(reader.getHeight(reader.getMinIndex()));
                }
                sizes[i] = String.valueOf((file.length()));
                pictures[i] = Files.readAllBytes(file.toPath());
            }
            i++;
            if (i > 9) {
                break;
            }
        }
        MockHttpServletRequestBuilder build = MockMvcRequestBuilders.multipart(uri).file("pictures", pictures[0])
                .file("pictures", pictures[1]).file("pictures", pictures[2]).file("pictures", pictures[3])
                .file("pictures", pictures[4]).file("pictures", pictures[5]).file("pictures", pictures[6])
                .file("pictures", pictures[7]).file("pictures", pictures[8]).file("pictures", pictures[9])
                .param("widths", widths).param("heights", heights).param("sizes", sizes).param("username", username);
        MvcResult mvcResult = mvc.perform(build).andReturn();
        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
    }

    @Test
    public void getPictures() throws Exception {
        String username = new User("usertest", "usertest").getUsername();
        int page = 1;
        String uri = "/api/v1/pictures/" + username + "/" + page;
        MvcResult result = mvc.perform(MockMvcRequestBuilders.get(uri)).andReturn();
        int status = result.getResponse().getStatus();
        String content = result.getResponse().getContentAsString();
        assertEquals(200, status);
        assertTrue(content.length() > 0);
    }

    @Test
    public void deletePictures() throws Exception {
        String uri = "/api/v1/pictures";
        String[] username = { new User("usertest", "usertest").getUsername() };
        String[] pictures = { "11", "12", "13", "14", "15", "16", "17", "18", "19", "20" };
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.put(uri).param("pictures", pictures)
                .param("username", username).contentType(MediaType.MULTIPART_FORM_DATA)).andReturn();
        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
    }

}