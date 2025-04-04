import XCTest
import SwiftTreeSitter
import TreeSitterFortran

final class TreeSitterFortranTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_fortran())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Fortran grammar for tree-sitter grammar")
    }
}
