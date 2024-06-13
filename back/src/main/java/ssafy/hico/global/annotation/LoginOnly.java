package ssafy.hico.global.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface LoginOnly {
    Level level() default Level.ALL;

    enum Level{
        PARENT,
        CHILD,
        ALL
    }
}