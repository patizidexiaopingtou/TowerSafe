aux_source_directory(${CMAKE_CURRENT_SOURCE_DIR} cli)

add_library(cli STATIC ${cli})
target_include_directories(cli PUBLIC ${CMAKE_CURRENT_LIST_DIR})
target_link_libraries(cli util jsapp mock)
