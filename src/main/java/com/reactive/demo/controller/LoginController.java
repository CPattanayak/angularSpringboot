package com.reactive.demo.controller;

import java.time.Duration;

import javax.validation.Valid;

import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reactive.demo.model.LoginUser;
import com.reactive.demo.repo.PaginatedLoginUserRepository;
import com.reactive.demo.repo.ReactiveLoginUserRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api")
public class LoginController {
	private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(LoginController.class);
	@Autowired
	ReactiveLoginUserRepository loginRepository;
	@Autowired
	PaginatedLoginUserRepository paginatedLoginRepo;

	@GetMapping("/user")
	public Flux<LoginUser> getAllCustomers() {
		System.out.println("Get all users...");
		
		return loginRepository.findAll();
	}
	
	@GetMapping("/users/{page}/{size}")
    public Page<LoginUser> getAllPaginatedCustomers(@PathVariable("page") Integer page,@PathVariable("size") Integer size)
    {
    	return paginatedLoginRepo.findAll(PageRequest.of(page, size));
    }
	@PostMapping("/user/create")
	public Mono<LoginUser> createCustomer(@Valid @RequestBody LoginUser user) {
		LOGGER.info("Create Customer: " + user.getUsername() + "...");

		
		return loginRepository.save(user);
	}

	@PutMapping("/user/{id}")
	public Mono<ResponseEntity<LoginUser>> updateCustomer(@PathVariable("id") String id,
			@RequestBody LoginUser user) {
		LOGGER.info("Update Customer with ID = " + id + "...");

		return loginRepository.findById(id).flatMap(userData -> {
			userData.setAddress(user.getAddress());
			userData.setEmail(user.getEmail());
			userData.setGender(user.getGender());
			userData.setPassword(user.getPassword());
			userData.setPhone(user.getPhone());
			userData.setUsername(user.getUsername());
			return loginRepository.save(userData);
		}).map(updatedcustomer -> new ResponseEntity<>(updatedcustomer, HttpStatus.OK))
				.defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@DeleteMapping("/user/{id}")
	public ResponseEntity<String> deleteCustomer(@PathVariable("id") String id) {
		LOGGER.info("Delete Customer with ID = " + id + "...");

		try {
			loginRepository.deleteById(id).subscribe();
		} catch (Exception e) {
			return new ResponseEntity<>("Fail to delete!", HttpStatus.EXPECTATION_FAILED);
		}

		return new ResponseEntity<>("Customer has been deleted!", HttpStatus.OK);
	}

	@DeleteMapping("/user/delete")
	public ResponseEntity<String> deleteAllCustomers() {
		LOGGER.info("Delete All Customers...");

		try {
			loginRepository.deleteAll().subscribe();
		} catch (Exception e) {
			return new ResponseEntity<>("Fail to delete!", HttpStatus.EXPECTATION_FAILED);
		}

		return new ResponseEntity<>("All customers have been deleted!", HttpStatus.OK);
	}

	
}
