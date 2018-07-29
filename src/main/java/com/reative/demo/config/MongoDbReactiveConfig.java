package com.reative.demo.config;

import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration;

import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;

public class MongoDbReactiveConfig extends AbstractReactiveMongoConfiguration{

	@Override
	public MongoClient reactiveMongoClient() {
		return MongoClients.create("mongodb://localhost");
	}

	@Override
	protected String getDatabaseName() {
		return "jsa_mongodb";
	}
}
