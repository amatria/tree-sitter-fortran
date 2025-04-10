package tree_sitter_fortran_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_fortran "github.com/tree-sitter/tree-sitter-fortran/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_fortran.Language())
	if language == nil {
		t.Errorf("Error loading Fortran grammar for tree-sitter grammar")
	}
}
