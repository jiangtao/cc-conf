package git

import (
	"os"
	"path/filepath"
	"testing"
)

func TestIsGitRepo(t *testing.T) {
	// Create temp directory
	tmpDir, err := os.MkdirTemp("", "git-test-*")
	if err != nil {
		t.Fatal(err)
	}
	defer os.RemoveAll(tmpDir)

	// Not a git repo initially
	isRepo, err := IsGitRepo(tmpDir)
	if err != nil {
		t.Fatalf("IsGitRepo() error = %v", err)
	}
	if isRepo {
		t.Error("IsGitRepo() = true, want false")
	}

	// Initialize git repo
	if err := Init(tmpDir); err != nil {
		t.Fatalf("Init() error = %v", err)
	}

	// Now it should be a git repo
	isRepo, err = IsGitRepo(tmpDir)
	if err != nil {
		t.Fatalf("IsGitRepo() error = %v", err)
	}
	if !isRepo {
		t.Error("IsGitRepo() = false, want true")
	}
}

func TestAddCommit(t *testing.T) {
	tmpDir, err := os.MkdirTemp("", "git-test-*")
	if err != nil {
		t.Fatal(err)
	}
	defer os.RemoveAll(tmpDir)

	// Initialize git repo
	if err := Init(tmpDir); err != nil {
		t.Fatalf("Init() error = %v", err)
	}

	// Set git config for commits in test repo
	if err := Config(tmpDir, "user.name", "Test User"); err != nil {
		t.Fatalf("Config name error = %v", err)
	}
	if err := Config(tmpDir, "user.email", "test@example.com"); err != nil {
		t.Fatalf("Config email error = %v", err)
	}

	// Create a test file
	testFile := filepath.Join(tmpDir, "test.txt")
	if err := os.WriteFile(testFile, []byte("test"), 0644); err != nil {
		t.Fatal(err)
	}

	// Add file
	if err := Add(tmpDir, "test.txt"); err != nil {
		t.Fatalf("Add() error = %v", err)
	}

	// Commit
	if err := Commit(tmpDir, "test commit"); err != nil {
		t.Fatalf("Commit() error = %v", err)
	}

	// Check if has changes
	hasChanges, err := HasChanges(tmpDir)
	if err != nil {
		t.Fatalf("HasChanges() error = %v", err)
	}
	if hasChanges {
		t.Error("HasChanges() = true, want false after commit")
	}
}
