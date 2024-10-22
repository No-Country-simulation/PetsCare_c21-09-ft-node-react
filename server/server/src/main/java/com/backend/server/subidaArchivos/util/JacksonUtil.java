package com.backend.server.subidaArchivos.util;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonUtil {

    @Bean
    public Jackson2ObjectMapperBuilderCustomizer jsonCustomizer() {
        return builder -> builder.featuresToDisable(SerializationFeature.FAIL_ON_EMPTY_BEANS)
                .featuresToEnable(SerializationFeature.INDENT_OUTPUT)
                .featuresToDisable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
                .featuresToDisable(MapperFeature.DEFAULT_VIEW_INCLUSION)
                .featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

}
