package io.casper.server;

import io.casper.server.enumeration.Status;
import io.casper.server.model.Server;
import io.casper.server.repository.ServerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
	CommandLineRunner run(ServerRepository serverRepository) {
	  return args -> {
		serverRepository.save(new Server(null,
				"192.168.8.1",
				"Ubuntu Linux",
				"16 GB",
				"Personal Computer",
				"http://localhost:8080/server/image/server1.png",
				Status.SERVER_UP));
		serverRepository.save(new Server(null,
				"192.168.2.1",
				"Fedora Linux",
				"16 GB",
				"Personal Computer",
				"http://localhost:8080/server/image/server2.png",
				Status.SERVER_DOWN));
		serverRepository.save(new Server(null,
				"192.168.3.22",
				"MS 2008",
				"32 GB",
				"Web Server",
				"http://localhost:8080/server/image/server3.png",
				null));
		serverRepository.save(new Server(null,
				"192.168.4.12",
				"Red Hat Enterprise Linux",
				"64 GB",
				"Mail Server",
				"http://localhost:8080/server/image/server4.png",
				null));
	  };
	}

  @Bean
  public CorsFilter corsFilter() {
	UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
	CorsConfiguration corsConfiguration = new CorsConfiguration();
	corsConfiguration.setAllowCredentials(true);
	corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:4200"));
	corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
			"Accept", "Jwt-Token", "Authorization", "Origin, Accept", "X-Requested-With",
			"Access-Control-Request-Method", "Access-Control-Request-Headers"));
	corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Jwt-Token", "Authorization",
			"Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "Filename"));
	corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
	urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
	return new CorsFilter(urlBasedCorsConfigurationSource);
  }

}
