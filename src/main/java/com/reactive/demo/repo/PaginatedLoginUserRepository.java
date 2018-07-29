package com.reactive.demo.repo;

import org.springframework.data.repository.PagingAndSortingRepository;


import com.reactive.demo.model.LoginUser;

public interface PaginatedLoginUserRepository extends PagingAndSortingRepository<LoginUser, String>{

}
