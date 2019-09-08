package com.example.demo.util;

public class Utils {

	public static int getAsInt(Object object) {
		if (object instanceof Integer) {
			return (int) object;
		} else if (object instanceof String) {
			try {
			return Integer.parseInt((String) object);
			} catch(Exception e) {
				return -1;
			}
		}

		return -1;
	}
}