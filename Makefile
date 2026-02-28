PNPM ?= pnpm

.PHONY: install dev build serve typecheck clean check

install:
	$(PNPM) install

dev:
	$(PNPM) start

build:
	$(PNPM) build

serve:
	$(PNPM) serve

typecheck:
	$(PNPM) typecheck

clean:
	$(PNPM) clear

check: typecheck build
