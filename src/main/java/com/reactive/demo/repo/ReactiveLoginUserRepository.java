package com.reactive.demo.repo;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import com.reactive.demo.model.LoginUser;



public interface ReactiveLoginUserRepository  extends ReactiveCrudRepository<LoginUser, String> {

}
