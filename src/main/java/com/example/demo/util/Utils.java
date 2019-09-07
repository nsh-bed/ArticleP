package com.example.demo.util;

public class Utils {

	public static int getAsInt(Object object) {
		if (object instanceof Integer) {
			return (int) object;
		} else if (object instanceof String) {
			return Integer.parseInt((String) object);
		}

		return -1;
	}
}