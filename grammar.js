/**
 * @file Fortran grammar for tree-sitter
 * @author Iñaki Amatria Barral
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const NEWLINE_REGEX = /\r?\n/;

const make_keyword_rule = ($, keyword) => {
  const parts = [];
  for (let i = 0; i < keyword.length; ++i) {
    parts.push(new RegExp(`[${keyword[i]}${keyword[i].toUpperCase()}]`));
  }
  return seq(...parts);
}

const make_end_stmt_rule = ($, keyword_rule) => {
  return seq(
    $.end_keyword,
    choice(optional(keyword_rule), seq(keyword_rule, optional($.name))),
    $.end_of_stmt,
  );
}

module.exports = grammar({
  name: "fortran",

  extras: $ => [/\s/, $.comment, $.ampersand_newline, $.bare_ampersand],

  rules: {
    source_file: $ => repeat(choice($.program)),

    // Program
    program: $ => seq(
      $.program_stmt,
      repeat($._specification_part_construct),
      $.end_program_stmt,
    ),

    program_stmt: $ => seq($.program_keyword, optional($.name), $.end_of_stmt),
    end_program_stmt: $ => make_end_stmt_rule($, $.program_keyword),

    // Specification part constructs
    _specification_part_construct: $ => choice($.variable_declaration),

    variable_declaration: $ => seq(
      choice($.integer_keyword),
      optional($.double_colon_keyword),
      $.name,
      $.end_of_stmt,
    ),

    // Name
    name: $ => seq(/[a-zA-Z_]/, repeat(/[a-zA-Z0-9_]/)),

    // Keywords
    program_keyword: $ => make_keyword_rule($, "program"),
    integer_keyword: $ => make_keyword_rule($, "integer"),
    double_colon_keyword: $ => make_keyword_rule($, "::"),
    end_keyword: $ => make_keyword_rule($, "end"),

    // Extras
    comment: $ => token(seq("!", /.*/)),

    ampersand_newline: $ => token(prec(1, seq("&", NEWLINE_REGEX))),
    bare_ampersand: $ => token(prec(0, "&")),

    // End of statement
    end_of_stmt: $ => choice($._semicolon, $._newline),

    _semicolon: $ => ";",
    _newline: $ => NEWLINE_REGEX,
  }
});
